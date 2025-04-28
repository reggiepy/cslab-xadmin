import React from 'react'
import app, { use } from 'xadmin'
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Button, 
  Spin
} from 'xui'

const SigininLayout = ({ error, children, invalid, handleSubmit, submitting }) => {
  const { _t } = app.context
  const { auth } = app.get('config')
  const nav = use('navigate')
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>{_t('Please Login')}</CardTitle>
            {error && <CardDescription className="text-red-500">{error}</CardDescription>}
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {children}
              { auth.can_reset_password && (<div className='text-sm mt-6'>{_t('Forgot password')}? <a className="cursor-pointer" onClick={()=>nav('/forget_password')}>{_t('reset password')}</a></div>) }
              <Button className="w-full" type="submit" disabled={submitting}>{submitting && <Spin />}{_t('Login')}</Button>
              { auth.can_signup && (<div className='text-sm'>{_t('Not registed')}? <a className="cursor-pointer" onClick={()=>nav('/signup')}>{_t('please signup')}</a></div>) }
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SigininLayout
