// import {
//   type ImageLoaderProps,
//   getImageProps,
//   ImageProps as NextImageProps
// } from 'next/image';
// import { CommonImageProps } from './image';

// export function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
//   const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];
//   return `https://erxes.io/cdn-cgi/image/${params.join(',')}/${src.trim()}`;
// }

// const Picture = (
//   props: CommonImageProps & { mobile: string; desktop: string }
// ) => {
//   const { mobile, desktop, ...restProps } = props;

//   const common = {
//     ...restProps,
//     loader: cloudflareLoader,
//     alt: props.alt || ''
//   };

//   const {
//     props: { srcSet: desktopSrc }
//   } = getImageProps({
//     ...common,
//     src: desktop
//   });

//   const {
//     props: { srcSet: mobileSrc, ...rest }
//   } = getImageProps({
//     ...common,
//     src: mobile
//   });

//   return (
//     <picture>
//       <source media="(min-width:768px)" srcSet={desktopSrc} />
//       <source media="(min-width:0px)" srcSet={mobileSrc} />
//       <img {...rest} />
//     </picture>
//   );
// };

// export default Picture;
