import React, { FC } from 'react';
import { FilledContext } from 'react-helmet-async';

export interface HtmlBoilerplateProps {
  children: string;
  scripts: string[];
  helmetContext: FilledContext;
}

const HtmlBoilerplate: FC<HtmlBoilerplateProps> = ({
  children,
  scripts,
  helmetContext: { helmet }
}) => {
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <div dangerouslySetInnerHTML={{ __html: children }} id="root" />
        {scripts.map((src, index) => (
          <script defer key={index} src={src} />
        ))}
      </body>
    </html>
  );
};

export default HtmlBoilerplate;
