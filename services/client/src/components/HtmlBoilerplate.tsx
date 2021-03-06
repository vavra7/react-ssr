import React, { FC } from 'react';
import { FilledContext } from 'react-helmet-async';

export interface HtmlBoilerplateProps {
  children: string;
  scripts: string[];
  styles: string[];
  helmetContext: FilledContext;
}

const HtmlBoilerplate: FC<HtmlBoilerplateProps> = ({
  children,
  scripts,
  styles,
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
        {styles.map((href, index) => (
          <link href={href} key={index} rel="stylesheet" />
        ))}
        {scripts.map((src, index) => (
          <script defer key={index} src={src} />
        ))}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <div dangerouslySetInnerHTML={{ __html: children }} id="root" />
      </body>
    </html>
  );
};

export default HtmlBoilerplate;
