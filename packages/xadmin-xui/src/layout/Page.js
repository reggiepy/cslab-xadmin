import React from 'react'

const Page = (props) => {
  const { title, subTitle, content, breadcrumb, extra, actions, tabs, footer, className, style, children, ...pageProps } = props

  return (
    <div className={className} style={style}>
      <div className="px-4 flex flex-col border-b h-14 justify-center">
        <div className="w-full flex justify-between items-center">
          <div className='flex gap-x-2 items-center'>
            <h2 className="text-lg font-bold">{title}</h2>
            {subTitle && <p className="text-muted-foreground">{subTitle}</p>}
          </div>
          {actions && <div className="flex space-x-2">
            {actions}
          </div>}
        </div>
      </div>
      {tabs && <div className="mt-2">{tabs}</div>}
      {breadcrumb && <div className="mt-2">{breadcrumb}</div>}
      {(content || extra) ? (
        <div className="p-4">
          {content && <div className="mb-2">{content}</div>}
          {extra && <div>{extra}</div>}   
        </div>
      ) : null}
      <div className="p-4">
        {children}
      </div>
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  )
}

export default Page
