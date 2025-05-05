"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { IS_TABLES } from "./isTablesData";
import RenderISTable from "./IStable";
import CalculatorTabs from "./calculator/CalculatorTabs";

export function CalculatorSection() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeTable, setActiveTable] = React.useState(IS_TABLES[0]);

  const openModal = (table: typeof IS_TABLES[number]) => {
    setActiveTable(table);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <section id="calculator" className="py-16 bg-gray-50 dark:bg-gray-800 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Try Our Calculator</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Design your concrete mix in minutes with our easy-to-use calculator
          </p>
        </div>

        {/* IS Tables Modal Trigger Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {IS_TABLES.map((table) => (
            <Button key={table.id} variant="outline" onClick={() => openModal(table)}>
              {table.label}
            </Button>
          ))}
        </div>

        <Modal isOpen={modalOpen} onClose={closeModal} title={activeTable.label}>
          <RenderISTable content={activeTable.content} />
        </Modal>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <CalculatorTabs/>
        </div>
      </div>
    </section>
  );
}
