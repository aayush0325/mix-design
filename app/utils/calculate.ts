function ceilingXcl(number: number, significance: number): number {
  if (significance === 0) return 0;
  return Math.ceil(number / significance) * significance;
}

export interface MixDesignInput {
  grade_designation: string;
  exposure_condition: string;
  max_agg_size: 10 | 20 | 40;
  cement_type: string;
  cement_sg: number;
  fa_zone: 'I' | 'II' | 'III' | 'IV';
  fa_sg: number;
  ca_sg: number;
  workability_slump: number;
  adopted_wc_ratio: number;
  use_superplasticizer: boolean;
  superplasticizer_pct: number;
  water_reduction_pct: number;
  admixture_sg: number;
  ca_absorption: number;
  fa_absorption: number;
  ca_moisture: number;
  fa_moisture: number;
  bulk_density_cement: number;
  bulk_density_fa: number;
  bulk_density_ca20: number;
  bulk_density_ca10: number;
  ca20_fraction: number;
  ca10_fraction: number;
}

export function concreteMixDesignIS10262(input: MixDesignInput): any {
  const TABLE5: Record<number, { min_cement: number; max_wc: number }> = {
    15: { min_cement: 300, max_wc: 0.55 },
    20: { min_cement: 300, max_wc: 0.55 },
    25: { min_cement: 300, max_wc: 0.5 },
    30: { min_cement: 320, max_wc: 0.45 },
    35: { min_cement: 340, max_wc: 0.45 },
    40: { min_cement: 360, max_wc: 0.4 },
  };
  const SUPPORTED_GRADES = Object.keys(TABLE5).map(Number);
  const STD_DEV_TABLE: Record<number, number> = { 30: 5.0, 35: 5.0, 40: 5.0 };
  const X_VALUE_TABLE: Record<number, number> = { 30: 6.5, 35: 6.5, 40: 6.5 };
  const AIR_CONTENT: Record<number, number> = { 10: 0.015, 20: 0.01, 40: 0.008 };
  const WATER_CONTENT: Record<number, number> = { 10: 208, 20: 186, 40: 165 };

  const COARSE_AGG_VOL: Record<string, Record<number, number>> = {
    I: { 10: 0.48, 20: 0.6, 40: 0.69 },
    II: { 10: 0.5, 20: 0.62, 40: 0.71 },
    III: { 10: 0.52, 20: 0.64, 40: 0.72 },
    IV: { 10: 0.54, 20: 0.66, 40: 0.73 },
  };

  const {
    grade_designation,
    max_agg_size,
    cement_sg,
    fa_zone,
    fa_sg,
    ca_sg,
    workability_slump,
    adopted_wc_ratio,
    use_superplasticizer = false,
    superplasticizer_pct = 0,
    water_reduction_pct = 0,
    admixture_sg = 1.25,
    ca_absorption = 0.5,
    fa_absorption = 1.0,
    ca_moisture = 0,
    fa_moisture = 0,
    bulk_density_cement = 1.3,
    bulk_density_fa = 1.76,
    bulk_density_ca20 = 1.6,
    bulk_density_ca10 = 1.55,
    ca20_fraction = 0.6,
    ca10_fraction = 0.4
  } = input;

  const fck = parseInt(grade_designation.slice(1));
  const std_dev = STD_DEV_TABLE[fck];
  const x_factor = X_VALUE_TABLE[fck];
  const target_strength = Math.max(fck + 1.65 * std_dev, fck + x_factor);

  const table5 = TABLE5[fck];
  if (!table5) {
    throw new Error(
      `Unsupported grade for Table 5 lookup. Supported grades: ${SUPPORTED_GRADES.map(g => 'M' + g).join(', ')}.`
    );
  }

  const max_wc_ratio_durability = table5.max_wc;
  const min_cement_content = table5.min_cement;
  const wc_check = adopted_wc_ratio <= max_wc_ratio_durability ? "OK" : "NOT OK";

  const base_water_50mm = WATER_CONTENT[max_agg_size];
  const slump_delta = workability_slump - 50;
  const water_slump_adjusted = base_water_50mm * (1 + 0.03 * (slump_delta / 25));
  const water_after_sp = use_superplasticizer && water_reduction_pct > 0 ? water_slump_adjusted * (1 - water_reduction_pct / 100) : water_slump_adjusted;
  const water_final = ceilingXcl(water_after_sp, 1);

  const cement_content = water_final / adopted_wc_ratio;
  const cement_check = cement_content >= min_cement_content ? "OK" : "NOT OK";


  const base_ca = COARSE_AGG_VOL[fa_zone][max_agg_size];
  const wc_adjust = ((0.5 - adopted_wc_ratio) / 0.05) * 0.01;
  const ca_vol = base_ca + wc_adjust;
  const fa_vol = 1 - ca_vol;


  const air_content = AIR_CONTENT[max_agg_size] ?? 0.01;
  const admixture_mass = use_superplasticizer ? (cement_content * superplasticizer_pct) / 100 : 0;
  const vol_admixture = admixture_mass / (admixture_sg * 1000);
  const vol_cement = cement_content / (cement_sg * 1000);
  const vol_water = water_final / 1000;
  const vol_air = air_content;
  const vol_total_agg = 1 - (vol_cement + vol_water + vol_air + vol_admixture);
  const vol_ca = vol_total_agg * ca_vol;
  const vol_fa = vol_total_agg * fa_vol;

  const mass_ca_ssd = vol_ca * ca_sg * 1000;
  const mass_fa_ssd = vol_fa * fa_sg * 1000;

  let water_to_be_added = water_final; // Start with the final water content
  let mass_fa_field;
  if (fa_moisture === 0 && fa_absorption > 0) {
    mass_fa_field = mass_fa_ssd / (1 + fa_absorption / 100);
    const fa_water_addition = mass_fa_ssd - mass_fa_field;
    water_to_be_added += fa_water_addition;
  } else {
    mass_fa_field = mass_fa_ssd * (1 + (fa_moisture - fa_absorption) / 100);
    water_to_be_added += (mass_fa_field - mass_fa_ssd);
  }

  let mass_ca_field;
  if (ca_moisture === 0 && ca_absorption > 0) {
    mass_ca_field = mass_ca_ssd / (1 + ca_absorption / 100);
    const ca_water_addition = mass_ca_ssd - mass_ca_field;
    water_to_be_added += ca_water_addition;
  } else {
    mass_ca_field = mass_ca_ssd * (1 + (ca_moisture - ca_absorption) / 100);
    water_to_be_added += (mass_ca_field - mass_ca_ssd);
  }


  const cement_ratio = 1;
  const sand_ratio = cement_content ? mass_fa_ssd / cement_content : 0;
  const agg_ratio = cement_content ? mass_ca_ssd / cement_content : 0;

  const vol_cement_bd = cement_content / (bulk_density_cement * 1000);
  const vol_fa_bd = mass_fa_ssd / (bulk_density_fa * 1000);

  const weight_ca20 = mass_ca_ssd * ca20_fraction;
  const weight_ca10 = mass_ca_ssd * ca10_fraction;
  const vol_ca20_bd = weight_ca20 / (bulk_density_ca20 * 1000);
  const vol_ca10_bd = weight_ca10 / (bulk_density_ca10 * 1000);

  // Volume batching ratios (all divided by cement volume)
  const vol_batch_cement = 1;
  const vol_batch_sand = vol_cement_bd ? vol_fa_bd / vol_cement_bd : 0;
  const vol_batch_ca20 = vol_cement_bd ? vol_ca20_bd / vol_cement_bd : 0;
  const vol_batch_ca10 = vol_cement_bd ? vol_ca10_bd / vol_cement_bd : 0;

  // Weight batching ratios
  const wt_batch_water = adopted_wc_ratio;  // Water to cement ratio by weight
  const wt_batch_cement = 1;
  const wt_batch_sand = cement_content ? mass_fa_ssd / cement_content : 0;
  const wt_batch_ca20 = cement_content ? weight_ca20 / cement_content : 0;
  const wt_batch_ca10 = cement_content ? weight_ca10 / cement_content : 0;

  // Volume batching ratios with water
  const vol_batch_water = vol_cement_bd ? water_final / (bulk_density_cement * 1000) / vol_cement_bd : 0;

  return {
    targetStrengthTab: {
      targetStrength: parseFloat(target_strength.toFixed(2)),
      standardDeviation: std_dev,
      xValue: x_factor,
      characteristicStrength: parseInt(grade_designation.slice(1))
    },
    waterCementRatioTab: {
      maxWcRatio: max_wc_ratio_durability,
      adopted: adopted_wc_ratio,
      check: adopted_wc_ratio <= max_wc_ratio_durability ? "OK" : "NOT OK",
    },
    waterContentTab: {
      base: base_water_50mm,
      targetSlump: workability_slump,
      adjustedForSlump: water_slump_adjusted,
      afterSP: water_after_sp,
      final: water_final,
      corrected: water_to_be_added,
    },
    cementContentTab: {
      calculated: Math.round(cement_content),
      minimum: min_cement_content,
      check: cement_check,
    },
    proportionVolumeTab: {
      aggregateSize: max_agg_size,
      zone: fa_zone,
      correctedVolumeCA: ca_vol,
      baseVolume: base_ca,
      referenceWCratio: 0.5,
      coarseAgg: vol_ca,
      fineAgg: vol_fa,
    },
    mixCalcTab:{
      volumeConcrete: 1,
      volumeAirEntrapped: air_content * 100, // expressed as percentage
      volumeCement: vol_cement,
      volumeWater: vol_water,
      volumeAdmixture: vol_admixture,
      volumeCoarseAgg: vol_ca,
      volumeFineAgg: vol_fa,
      massFA: mass_fa_ssd,
      massCA: mass_ca_ssd,
    },
    // mixSSDTab: {
    //   cement: cement_content,
    //   water: water_final,
    //   fineAgg: mass_fa_ssd,
    //   coarseAgg: mass_ca_ssd,
    //   admixture: admixture_mass,
    // },
    mixPropTab: {
      cement: cement_content,
      water: water_final,
      fineAgg: mass_fa_ssd,
      coarseAgg: mass_ca_ssd,
      admixture: admixture_mass,
      waterCementRatio: adopted_wc_ratio,
    },
    batchingTab: {
      volumes: {
        cement: vol_cement_bd,
        fineAgg: vol_fa_bd,
        ca20: vol_ca20_bd,
        ca10: vol_ca10_bd,
      },
      caSplit: {
        ca20Fraction: ca20_fraction,
        ca10Fraction: ca10_fraction,
        weightCa20: weight_ca20,
        weightCa10: weight_ca10,
      },
      bulkDensities: {
        cement: bulk_density_cement,
        fineAgg: bulk_density_fa,
        ca20: bulk_density_ca20,
        ca10: bulk_density_ca10,
      },
      volumeBatchRatios: {
        water: parseFloat(vol_batch_water.toFixed(3)),
        cement: parseFloat(vol_batch_cement.toFixed(3)),
        sand: parseFloat(vol_batch_sand.toFixed(3)),
        ca20: parseFloat(vol_batch_ca20.toFixed(3)),
        ca10: parseFloat(vol_batch_ca10.toFixed(3))
      },
      weightBatchRatios: {
        water: parseFloat(wt_batch_water.toFixed(3)),
        cement: parseFloat(wt_batch_cement.toFixed(3)),
        sand: parseFloat(wt_batch_sand.toFixed(3)),
        ca20: parseFloat(wt_batch_ca20.toFixed(3)),
        ca10: parseFloat(wt_batch_ca10.toFixed(3))
      }
    },
  };
}