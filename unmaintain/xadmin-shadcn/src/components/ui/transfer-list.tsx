'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeftIcon, ChevronRightIcon, SquareCheckIcon, SquareIcon } from 'lucide-react'
import React from 'react'

// 假设 _t 是一个国际化函数
import { _t } from '@/lib/utils'

type Item = {
  key: string
  label: string
  selected?: boolean
}

export default function TransferList({ items, value, onChange }: { items: Item[], value: string[], onChange: (value: string[]) => void }) {
  const [leftList, setLeftList] = React.useState<Item[]>(items)
  const [rightList, setRightList] = React.useState<Item[]>(items.filter(item => value.includes(item.key)))
  const [leftSearch, setLeftSearch] = React.useState('')
  const [rightSearch, setRightSearch] = React.useState('')

  const moveToRight = () => {
    const selectedItems = leftList.filter((item) => item.selected)
    setRightList([...rightList, ...selectedItems])
    setLeftList(leftList.filter((item) => !item.selected))
    onChange([...value, ...selectedItems.map(item => item.key)])
  }

  const moveToLeft = () => {
    const selectedItems = rightList.filter((item) => item.selected)
    setLeftList([...leftList, ...selectedItems])
    setRightList(rightList.filter((item) => !item.selected))
    onChange(value.filter(key => !selectedItems.some(item => item.key === key)))
  }

  const toggleSelection = (list: Item[], setList: React.Dispatch<React.SetStateAction<Item[]>>, key: string) => {
    const updatedList = list.map((item) => {
      if (item.key === key) {
        return { ...item, selected: !item.selected }
      }
      return item
    })

    setList(updatedList)
  }

  return (
    <div className='flex space-x-4'>
      <div className='w-1/2 shadow-sm bg-background rounded-sm'>
        <div className='flex items-center justify-between'>
          <Input
            placeholder={_t('Search')}
            className='rounded-br-none rounded-bl-none rounded-tr-none focus-visible:ring-0 focus-visible:border-blue-500'
            value={leftSearch}
            onChange={(e) => setLeftSearch(e.target.value)}
          />
          <Button
            className='rounded-tl-none rounded-bl-none rounded-br-none border-l-0'
            onClick={moveToRight}
            size='icon'
            variant='outline'>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
        </div>
        <ul className='h-[200px] border-l border-r border-b rounded-br-sm rounded-bl-sm p-1.5 overflow-y-scroll'>
          {leftList
            .filter((item) => item.label.toLowerCase().includes(leftSearch.toLowerCase()))
            .map((item) => (
              <li className='flex items-center gap-1.5 text-sm hover:bg-muted rounded-sm' key={item.key}>
                <button
                  className='flex items-center gap-1.5 w-full p-1.5'
                  onClick={() => toggleSelection(leftList, setLeftList, item.key)}>
                  {item.selected ? (
                    <SquareCheckIcon className='h-5 w-5 text-muted-foreground/50' />
                  ) : (
                    <SquareIcon className='h-5 w-5 text-muted-foreground/50' />
                  )}
                  {item.label}
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className='w-1/2 shadow-sm bg-background rounded-sm'>
        <div className='flex items-center justify-between'>
          <Button
            className='rounded-tr-none rounded-br-none rounded-bl-none border-r-0'
            onClick={moveToLeft}
            size='icon'
            variant='outline'>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Input
            placeholder={_t('Search')}
            className='rounded-bl-none rounded-br-none rounded-tl-none focus-visible:ring-0 focus-visible:border-blue-500'
            value={rightSearch}
            onChange={(e) => setRightSearch(e.target.value)}
          />
        </div>
        <ul className='h-[200px] border-l border-r border-b rounded-br-sm rounded-bl-sm p-1.5 overflow-y-scroll'>
          {rightList
            .filter((item) => item.label.toLowerCase().includes(rightSearch.toLowerCase()))
            .map((item) => (
              <li className='flex items-center gap-1.5 text-sm hover:bg-muted rounded-sm' key={item.key}>
                <button
                  className='flex items-center gap-1.5 w-full p-1.5'
                  onClick={() => toggleSelection(rightList, setRightList, item.key)}>
                  {item.selected ? (
                    <SquareCheckIcon className='h-4 w-4 text-muted-foreground/50' />
                  ) : (
                    <SquareIcon className='h-4 w-4 text-muted-foreground/50' />
                  )}
                  {item.label}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}