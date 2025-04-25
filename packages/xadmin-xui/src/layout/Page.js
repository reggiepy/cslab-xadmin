import React from 'react'

const Page = (props) => {
  const { title, subTitle, content, breadcrumb, extra, actions, tabs, footer, className, style, children, ...pageProps } = props

  return (
    <div className={className} style={style}>
      <div className="p-2">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          {actions && <div className="flex space-x-2">
            {subTitle && <p className="text-muted-foreground">{subTitle}</p>}
            {actions}
          </div>}
        </div>
        {tabs && <div className="mt-2">{tabs}</div>}
        {breadcrumb && <div className="mt-2">{breadcrumb}</div>}
        {footer && <div className="mt-2">{footer}</div>}
      </div>
      {(content || extra) ? (
        <div className="p-2">
          {content && <div className="mb-2">{content}</div>}
          {extra && <div>{extra}</div>}   
        </div>
      ) : null}
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}

export default Page
