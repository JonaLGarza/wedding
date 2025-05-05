import { ElementType, HTMLAttributes, createElement } from "react";
import { cn } from "../../../lib/utils";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = ({
  level = 2,
  className,
  children,
  ...props
}: HeadingProps) => {
  const Component = `h${level}` as ElementType;
  
  const styles = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-lg font-semibold tracking-tight",
    h6: "scroll-m-20 text-base font-semibold tracking-tight",
  };

  return createElement(
    Component,
    {
      className: cn(styles[`h${level}`], className),
      ...props
    },
    children
  );
};

export default Heading; 