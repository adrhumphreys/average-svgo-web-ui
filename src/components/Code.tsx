import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

SyntaxHighlighter.registerLanguage('svg', markup)

type Props = {
    source: string;
}

const Code = ({ source }: Props) => (
    <SyntaxHighlighter language="svg" style={prism}>
        {source}
    </SyntaxHighlighter>
)

export default Code;