import React, { useState } from 'react'
import { Input, Tooltip } from 'xui'
import { app, api } from 'xadmin'

const CaptchaCodeInput = (props) => {
  const { input, field } = props
  const { _t } = app.context

  const getCodeUrl = () => {
    return api({}).host + (field.captcha_url || '/get_captcha_code') + '?random=' + Math.random().toString()
  }

  const [url, setUrl] = useState(getCodeUrl())

  return (
    <div className="flex gap-x-1">
      <div className="w-7/12">
        <Input {...input} {...field.attrs} />
      </div>
      <div className="w-5/12">
        <Tooltip title={_t('Click to refresh captcha code')}>
          <img 
            className='w-full h-full cursor-pointer'
            onClick={() => setUrl(getCodeUrl())} 
            src={url} 
            alt="captcha"
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default CaptchaCodeInput
