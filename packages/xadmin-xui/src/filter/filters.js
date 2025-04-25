import React from 'react'
import { app, config } from 'xadmin'
import { Search as SearchOutlined, Filter as FilterOutlined } from 'lucide-react'
import { Row, Col, Form, Space, Modal, Typography, Grid } from 'antd'

import { Input } from 'xui'

import {
  Button,
  Card,
  CardContent,
  Spin,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "xui"

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "xui"


const { useBreakpoint } = Grid;

const FilterForm = ({ children, invalid, handleSubmit, submitting, options, resetFilter }) => {
  const { _t } = app.context
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
      {options && options.submitOnChange ? null : (
        <div className='flex gap-4 justify-center'>
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
    <Form layout="inline" onSubmit={handleSubmit}>
      {children}
      {options && options.submitOnChange ? null : (
        <Form.Item>
          <Space>
            <Button disabled={invalid} loading={submitting} type="primary" onClick={handleSubmit} icon={<SearchOutlined />}>{_t('Search')}</Button>
            <Button disabled={submitting} onClick={resetFilter}>{_t('Reset')}</Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  )
}

const FilterOpenLink = ({ count, onClick, show }) => {
  const { _t } = app.context
  const screens = useBreakpoint();
  
  return (screens.xxl == false && count > 3) || count > 4 ? 
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
          <div className="grid grid-cols-6 gap-4" style={{ flexWrap: (children.length <= 3 || showAllFilter) ? 'wrap' : 'nowrap' }}>{children}</div>
          {options && options.submitOnChange ? null : (
            <div className='flex gap-4 justify-center mt-4'>
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


class FilterModal extends React.Component {

  state = { show: false }

  onClose = () => {
    this.setState({ show: false })
  }
  
  render() {
    const { _t } = app.context
    const { children, invalid, handleSubmit, submitting, options, resetFilter } = this.props
    const icon = submitting ? 'spinner fa-spin' : 'floppy-o'

    const buttons = options && options.submitOnChange ? {} : {
      okText: _t('Search'),
      cancelText: _t('Reset'),
      okButtonProps: { disabled: invalid, loading: submitting, icon: <SearchOutlined /> },
      onOk: ()=>{
        handleSubmit()
        this.onClose()
      },
      onCancel: ()=>{
        resetFilter()
        this.onClose()
      }
    }

    return [
      (
        <Button key="filter-btn" onClick={()=>this.setState({ show: true })}>
          <FilterOutlined /> {_t('Filter')}
        </Button>
      ), (
        <Modal
          key="filter-modal"
          title={_t('Filter Form')}
          visible={this.state.show}
          {...buttons}
        >
          <Form onSubmit={handleSubmit}>{children}</Form>
        </Modal>
      )
    ]
  }

}

export {
  FilterForm, NavForm, Submenu, FilterModal
}
