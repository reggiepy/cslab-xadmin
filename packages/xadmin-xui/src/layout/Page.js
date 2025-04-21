import React from 'react'

const Page = (props) => {
  const { title, subTitle, content, breadcrumb, extra, actions, tabs, footer, className, style, children, ...pageProps } = props

  return (
    <div className={className} style={style}>
      <div className="p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}
          </div>
          {actions && <div className="flex space-x-2">{actions}</div>}
        </div>
        {tabs && <div className="mt-4">{tabs}</div>}
        {breadcrumb && <div className="mt-4">{breadcrumb}</div>}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
      {(content || extra) ? (
        <div className="p-4">
          {content && <div className="mb-4">{content}</div>}
          {extra && <div>{extra}</div>}
        </div>
      ) : null}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

export default Page
