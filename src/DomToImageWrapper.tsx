import * as React from 'react';
import { domToImage } from './dom-to-image';

export interface DomToImageWrapperProps {
    render: (props: DomToImageWrapperProps) => React.ReactNode;
    renderToImage?: (node: HTMLElement) => void;
    // renderingOptions: DomToImageOptions;
}

export class DomToImageWrapper extends React.Component<DomToImageWrapperProps> {
    public wrapperRef: React.RefObject<any>;

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
    }

    private async renderToImage(node) {
        if (this.props.renderToImage) {
            this.props.renderToImage(node);
        } else {
            const toImage = await domToImage.toPng(node);
        }
    }

    public render() {
        return <span ref={this.wrapperRef}>{ this.props.render(this.props) }</span>;
    }
}