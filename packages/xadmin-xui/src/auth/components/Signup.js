import React from 'react'
import app from 'xadmin'
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Button
} from 'xui'
import { _t } from 'xadmin-i18n'

export default ({ error, children, invalid, handleSubmit, submitting }) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>{_t('Please Signup')}</CardTitle>
            {error && <CardDescription className="text-red-500">{error}</CardDescription>}
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {children}
              <Button className="w-full" type="submit" disabled={submitting}>{submitting && <Spin />}{_t('Signup')}</Button>
              <div className='text-sm'>{_t('Have account')}? <a className="cursor-pointer" onClick={()=>app.go('/login')}>{_t('please login')}</a></div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
