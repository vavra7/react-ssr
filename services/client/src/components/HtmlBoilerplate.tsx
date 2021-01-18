import React, { FC, ReactNode } from 'react';

export interface HtmlBoilerplateProps {
  children?: ReactNode;
  scripts: string[];
}

const HtmlBoilerplate: FC<HtmlBoilerplateProps> = ({ children, scripts }) => {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <title>Document</title>
        </head>
        <body>
          <div id="root">{children}</div>
          {scripts.map((src, index) => (
            <script defer key={index} src={src} />
          ))}
        </body>
      </html>
    </>
  );
};

export default HtmlBoilerplate;
