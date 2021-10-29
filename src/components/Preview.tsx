type Props = {
  html: string;
};

const Preview = ({ html }: Props) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);

export default Preview;
