import React from 'react'
import { app, config } from 'xadmin'
import { Search as SearchOutlined, Filter as FilterOutlined } from 'lucide-react'

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "xui"

const FilterForm = ({ children, invalid, handleSubmit, submitting, options, resetFilter }) => {
  const { _t } = app.context
  return (
    <form onSubmit={handleSubmit} className="flex space-y-2">
      {children}
      {options && options.submitOnChange ? null : (
        <div className='flex gap-2 justify-center'>
          <Button disabled={invalid} loading={submitting} type="primary" onClick={handleSubmit} icon={<SearchOutlined />}>{_t('Search')}</Button>
          <Button disabled={submitting} onClick={resetFilter}>{_t('Reset')}</Button>
        </div>
      )}
    </form>
  )
}

const NavForm = ({ children, invalid, handleSubmit, submitting, options, resetFilter }) => {
  const { _t } = app.context
  return (
    <form onSubmit={handleSubmit} className="flex space-y-2">
      {children}
      {options && options.submitOnChange ? null : (
        <div className='flex gap-2 justify-center'>
          <Button disabled={invalid} loading={submitting} type="primary" onClick={handleSubmit} icon={<SearchOutlined />}>{_t('Search')}</Button>
          <Button disabled={submitting} onClick={resetFilter}>{_t('Reset')}</Button>
        </div>
      )}
    </form>
  )
}

const FilterOpenLink = ({ count, onClick, show }) => {
  const { _t } = app.context
  
  return true ? 
  <Button variant="link" onClick={onClick}>
    {show ? _t('Collapse'): _t('Expand') }
  </Button> : null
}

const Submenu = ({ children, invalid, handleSubmit, submitting, options, resetFilter }) => {
  const { _t } = app.context
  const defaultShowAllFilter = config('filter') && config('filter').submenuShowAllFilter == true
  const [ showAllFilter, setShowAllFilter ] = React.useState(defaultShowAllFilter)

  return (
    <form className="ant-advanced-search-form" onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <div className="grid grid-cols-5 gap-2" style={{ flexWrap: (children.length <= 3 || showAllFilter) ? 'wrap' : 'nowrap' }}>{children}</div>
          {options && options.submitOnChange ? null : (
            <div className='flex gap-2 justify-center mt-2'>
              <Button disabled={invalid} loading={submitting} onClick={handleSubmit}><SearchOutlined /> {_t('Search')}</Button>
              <Button disabled={submitting} onClick={resetFilter} variant="secondary">{_t('Reset')}</Button>
              <FilterOpenLink count={children.length} onClick={() => setShowAllFilter(!showAllFilter)} show={showAllFilter} />
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
}


const FilterModal = ({ children, invalid, handleSubmit, submitting, options, resetFilter }) => {
  const { _t } = app.context
  const [show, setShow] = React.useState(false)
  
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button key="filter-btn" onClick={() => setShow(true)}>
          <FilterOutlined /> {_t('Filter')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{_t('Filter Form')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex space-y-2">{children}</form>
        <DialogFooter>
          <Button variant="secondary" onCancel={() => {
            resetFilter()
            setShow(false)
          }}>_t('Reset')</Button>
          <Button loading={submitting} disabled={invalid} onClick={() => {
            handleSubmit()
            setShow(false)
          }}><SearchOutlined /> _t('Search')</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export {
  FilterForm, NavForm, Submenu, FilterModal
}
