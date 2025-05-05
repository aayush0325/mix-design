import math
import json

def ceiling_xcl(number, significance):
    if significance == 0:
        return 0
    return math.ceil(number / significance) * significance

def concrete_mix_design_IS10262(
    grade_designation,
    exposure_condition,
    max_agg_size,
    cement_type,
    cement_sg,
    fa_zone,
    fa_sg,
    ca_sg,
    workability_slump,
    adopted_wc_ratio,
    use_superplasticizer=False,
    superplasticizer_pct=0.0,
    water_reduction_pct=0.0,
    admixture_sg=1.25,
    ca_absorption=0.5,
    fa_absorption=1.0,
    ca_moisture=0,
    fa_moisture=0,
    bulk_density_cement=1.3,
    bulk_density_fa=1.76,
    bulk_density_ca20=1.6,
    bulk_density_ca10=1.55,
    ca20_fraction=0.6,
    ca10_fraction=0.4
):
    # IS 456:2000 Table 5 for Reinforced Concrete
    TABLE5 = {
        15: {"min_cement": 300, "max_wc": 0.55},
        20: {"min_cement": 300, "max_wc": 0.55},
        25: {"min_cement": 300, "max_wc": 0.50},
        30: {"min_cement": 320, "max_wc": 0.45},
        35: {"min_cement": 340, "max_wc": 0.45},
        40: {"min_cement": 360, "max_wc": 0.40}
    }
    STD_DEV_TABLE = {30: 5.0, 35: 5.0, 40: 5.0}
    X_VALUE_TABLE = {30: 6.5, 35: 6.5, 40: 6.5}
    AIR_CONTENT = {10: 0.015, 20: 0.010, 40: 0.008}
    WATER_CONTENT = {10: 208, 20: 186, 40: 165}
    COARSE_AGG_VOL = {
        "I": {10: 0.48, 20: 0.60, 40: 0.69},
        "II": {10: 0.50, 20: 0.62, 40: 0.71},
        "III": {10: 0.52, 20: 0.64, 40: 0.72},
        "IV": {10: 0.54, 20: 0.66, 40: 0.73}
    }

    fck = int(grade_designation[1:])
    std_dev = STD_DEV_TABLE.get(fck, 5.0)
    x_factor = X_VALUE_TABLE.get(fck, 6.5)
    target_strength = max(fck + 1.65 * std_dev, fck + x_factor)

    # Table 5 lookup
    table5 = TABLE5.get(fck)
    if not table5:
        raise ValueError("Unsupported grade for Table 5 lookup.")

    max_wc_ratio_durability = table5["max_wc"]
    min_cement_content = table5["min_cement"]

    wc_check = "OK" if adopted_wc_ratio <= max_wc_ratio_durability else "NOT OK"

    # --- STEP 1: Base water content for 50mm slump ---
    base_water_50mm = WATER_CONTENT[max_agg_size]

    # --- STEP 2: Adjust for required slump ---
    slump_delta = workability_slump - 50
    water_slump_adjusted = base_water_50mm * (1 + 0.03 * (slump_delta / 25))

    # --- STEP 3: Adjust for superplasticizer ---
    water_after_sp = water_slump_adjusted * (1 - water_reduction_pct / 100) if use_superplasticizer and water_reduction_pct > 0 else water_slump_adjusted

    water_final = ceiling_xcl(water_after_sp, 1)

    # --- STEP 5: Cement content ---
    cement_content = water_final / adopted_wc_ratio
    cement_check = "OK" if cement_content >= min_cement_content else "NOT OK"

    # Air content
    air_content = AIR_CONTENT.get(max_agg_size, 0.010)

    # Aggregate proportions
    base_ca = COARSE_AGG_VOL[fa_zone][max_agg_size]
    wc_adjust = ((0.5 - adopted_wc_ratio) / 0.05) * 0.01
    ca_vol = base_ca + wc_adjust
    fa_vol = 1 - ca_vol

    # Admixture
    if use_superplasticizer:
        admixture_mass = cement_content * superplasticizer_pct / 100
        vol_admixture = admixture_mass / (admixture_sg * 1000)
    else:
        admixture_mass = 0
        vol_admixture = 0

    # Volumes
    vol_cement = cement_content / (cement_sg * 1000)
    vol_water = water_final / 1000
    vol_air = air_content
    vol_total_agg = 1 - (vol_cement + vol_water + vol_air + vol_admixture)
    vol_ca = vol_total_agg * ca_vol
    vol_fa = vol_total_agg * fa_vol

    # Masses
    mass_ca_ssd = vol_ca * ca_sg * 1000
    mass_fa_ssd = vol_fa * fa_sg * 1000

    # Moisture adjustments
    water_to_be_added = water_final
    if fa_moisture == 0 and fa_absorption > 0:
        mass_fa_field = mass_fa_ssd / (1 + fa_absorption / 100)
        water_to_be_added += mass_fa_ssd - mass_fa_field
    else:
        mass_fa_field = mass_fa_ssd * (1 + (fa_moisture - fa_absorption) / 100)
        water_to_be_added += mass_fa_field - mass_fa_ssd

    if ca_moisture == 0 and ca_absorption > 0:
        mass_ca_field = mass_ca_ssd / (1 + ca_absorption / 100)
        water_to_be_added += mass_ca_ssd - mass_ca_field
    else:
        mass_ca_field = mass_ca_ssd * (1 + (ca_moisture - ca_absorption) / 100)
        water_to_be_added += mass_ca_field - mass_ca_ssd

    # --------- VOLUME & WEIGHT BATCHING CALCULATIONS ---------
    # Weight batching (ratios by weight)
    cement_ratio = 1
    sand_ratio = mass_fa_ssd / cement_content if cement_content else 0
    agg_ratio = mass_ca_ssd / cement_content if cement_content else 0

    # Volume of each material (kg / bulk density)
    vol_cement_bd = cement_content / (bulk_density_cement * 1000)
    vol_fa_bd = mass_fa_ssd / (bulk_density_fa * 1000)

    # Split coarse aggregate into CA20 and CA10 fractions
    weight_ca20 = mass_ca_ssd * ca20_fraction
    weight_ca10 = mass_ca_ssd * ca10_fraction
    vol_ca20_bd = weight_ca20 / (bulk_density_ca20 * 1000)
    vol_ca10_bd = weight_ca10 / (bulk_density_ca10 * 1000)

    # Volume batching ratios (all divided by cement volume)
    vol_batch_cement = 1
    vol_batch_sand = vol_fa_bd / vol_cement_bd if vol_cement_bd else 0
    vol_batch_ca20 = vol_ca20_bd / vol_cement_bd if vol_cement_bd else 0
    vol_batch_ca10 = vol_ca10_bd / vol_cement_bd if vol_cement_bd else 0

    wt_batch_water = adopted_wc_ratio  # Water to cement ratio by weight
    wt_batch_cement = 1
    wt_batch_sand = mass_fa_ssd / cement_content if cement_content else 0
    wt_batch_ca20 = weight_ca20 / cement_content if cement_content else 0
    wt_batch_ca10 = weight_ca10 / cement_content if cement_content else 0

    # Volume batching ratios with water
    vol_batch_water = water_final / (bulk_density_cement * 1000) / vol_cement_bd if vol_cement_bd else 0

    return {
        "Target Strength": round(target_strength, 2),
        "Water-Cement Ratio": {
            "Required for Target Strength": round(adopted_wc_ratio, 2),
            "Maximum for Durability": round(max_wc_ratio_durability, 2),
            "Adopted": round(adopted_wc_ratio, 2),
            "Check": wc_check
        },
        "Water Content": {
            "Base (50mm slump)": round(base_water_50mm, 2),
            "Adjusted for Slump": round(water_slump_adjusted, 3),
            "After Superplasticizer": round(water_after_sp, 3),
            "Final (Ceiling)": round(water_final, 2),
            "To Be Added (after aggregate corrections)": round(water_to_be_added, 2)
        },
        "Cement Content": {
            "Calculated": round(cement_content),
            "Minimum Required": min_cement_content,
            "Check": cement_check
        },
        "Volumes": {
            "Cement": round(vol_cement, 5),
            "Water": round(vol_water, 5),
            "Air": round(vol_air, 5),
            "Admixture": round(vol_admixture, 5),
            "Coarse Aggregate": round(vol_ca, 5),
            "Fine Aggregate": round(vol_fa, 5),
        },
        "Mix (SSD Condition)": {
            "Cement": round(cement_content, 2),
            "Water": round(water_final, 2),
            "Fine Aggregate": round(mass_fa_ssd, 2),
            "Coarse Aggregate": round(mass_ca_ssd, 2),
            "Admixture": round(admixture_mass, 2)
        },
        "Mix (Field Condition)": {
            "Cement": round(cement_content, 2),
            "Water": round(water_to_be_added, 2),
            "Fine Aggregate": round(mass_fa_field, 2),
            "Coarse Aggregate": round(mass_ca_field, 2),
            "Admixture": round(admixture_mass, 2)
        },
        "Batching Ratios and Volumes": {
            "Weight Batching": {
                "water": round(wt_batch_water, 2),
                "cement": wt_batch_cement,
                "sand": round(wt_batch_sand, 5),
                "CA20": round(wt_batch_ca20, 5),
                "CA10": round(wt_batch_ca10, 5),
                "remarks": "wt. batching"
            },
            "Volume Batching": {
                "water": round(vol_batch_water, 2),
                "cement": vol_batch_cement,
                "sand": round(vol_batch_sand, 5),
                "CA20": round(vol_batch_ca20, 5),
                "CA10": round(vol_batch_ca10, 5),
                "remarks": "vol. batching"
            },
            "Volume of Materials (m3)": {
                "Cement": round(vol_cement_bd, 5),
                "Fine Aggregate": round(vol_fa_bd, 5),
                "CA20": round(vol_ca20_bd, 5),
                "CA10": round(vol_ca10_bd, 5)
            },
            "CA Split": {
                "CA20 Fraction": ca20_fraction,
                "CA10 Fraction": ca10_fraction,
                "CA20 Weight (kg)": round(weight_ca20, 3),
                "CA10 Weight (kg)": round(weight_ca10, 3)
            },
            "Bulk Densities Used (kg/l)": {
                "Cement": bulk_density_cement,
                "Fine Aggregate": bulk_density_fa,
                "CA20": bulk_density_ca20,
                "CA10": bulk_density_ca10
            },
        }
    }

if __name__ == "__main__":
    import json

    # M40 example (Annex A)
    # result_m40 = concrete_mix_design_IS10262(
    #     grade_designation="M40",
    #     exposure_condition="Severe",
    #     max_agg_size=20,
    #     cement_type="PPC",
    #     cement_sg=2.88,
    #     fa_zone="II",
    #     fa_sg=2.65,
    #     ca_sg=2.74,
    #     workability_slump=75,
    #     adopted_wc_ratio=0.36,  # Adopted as per design
    #     use_superplasticizer=True,
    #     superplasticizer_pct=1.0,
    #     water_reduction_pct=23,
    #     ca_absorption=0.5,
    #     fa_absorption=1.0
    # )
    # print("M40 Example:")
    # print(json.dumps(result_m40, indent=4))

    # M35 Excel Sheet example
    result = concrete_mix_design_IS10262(
        grade_designation="M35",
        exposure_condition="Severe",
        max_agg_size=20,
        cement_type="PPC",
        cement_sg=2.9,
        fa_zone="II",
        fa_sg=2.65,
        ca_sg=2.66,
        workability_slump=140,
        adopted_wc_ratio=0.4,
        use_superplasticizer=True,
        superplasticizer_pct=0.5,
        water_reduction_pct=15,
        admixture_sg=1.25,
        ca_absorption=0.5,
        fa_absorption=1.05,
        bulk_density_cement=1.3,
        bulk_density_fa=1.76,
        bulk_density_ca20=1.6,
        bulk_density_ca10=1.55,
        ca20_fraction=0.6,
        ca10_fraction=0.4
    )
    print("\nM35 Excel Sheet Example:")
    print(json.dumps(result, indent=4))
