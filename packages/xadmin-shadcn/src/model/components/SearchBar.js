import React from 'react'
import _ from 'lodash'
import app, { use } from 'xadmin'
import { Input } from "@/components/ui/input"

const SearchBar = () => {
  const { _t } = app.context
  const { onSearch, searchTitles, searchValue } = use('model.searchbar')
  if(searchTitles && searchTitles.length > 0) {
    const placeholder = _t('Search') + ' ' + searchTitles.join(', ')
    return (
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder={placeholder}
          defaultValue={searchValue || undefined}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onSearch(e.target.value)
            }
          }}
        />
      </div>
    )
  }
  return null
} 
export default SearchBar
