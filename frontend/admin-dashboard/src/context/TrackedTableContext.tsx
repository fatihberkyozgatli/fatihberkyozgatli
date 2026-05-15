import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface TrackedTable {
  id: number
  tableName: string
  fileName: string
}

interface TrackedTableContextType {
  tables: TrackedTable[]
  addTable: (table: TrackedTable) => void
  updateTable: (id: number, table: Partial<TrackedTable>) => void
  deleteTable: (id: number) => void
  getNextId: () => number
}

const TrackedTableContext = createContext<TrackedTableContextType | undefined>(undefined)

export function TrackedTableProvider({ children }: { children: ReactNode }) {
  const [tables, setTables] = useState<TrackedTable[]>([
    { id: 1, tableName: 'listprop', fileName: 'table-listprop.csv' },
    { id: 2, tableName: 'property', fileName: 'table-property.csv' },
    { id: 3, tableName: 'job', fileName: 'table-job.csv' },
    { id: 4, tableName: 'category', fileName: 'table-category.csv' },
    { id: 5, tableName: 'acct', fileName: 'table-acct.csv' },
  ])
  const [nextId, setNextId] = useState(6)

  const addTable = (table: TrackedTable) => {
    setTables((prevTables) => [...prevTables, table])
  }

  const updateTable = (id: number, updates: Partial<TrackedTable>) => {
    setTables((prevTables) =>
      prevTables.map((table) => (table.id === id ? { ...table, ...updates } : table))
    )
  }

  const deleteTable = (id: number) => {
    setTables((prevTables) => prevTables.filter((table) => table.id !== id))
  }

  const getNextId = () => {
    const newId = nextId
    setNextId((n) => n + 1)
    return newId
  }

  return (
    <TrackedTableContext.Provider value={{ tables, addTable, updateTable, deleteTable, getNextId }}>
      {children}
    </TrackedTableContext.Provider>
  )
}

export function useTrackedTables() {
  const context = useContext(TrackedTableContext)
  if (!context) {
    throw new Error('useTrackedTables must be used within a TrackedTableProvider')
  }
  return context
}
