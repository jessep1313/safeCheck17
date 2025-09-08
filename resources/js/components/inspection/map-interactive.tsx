import React from "react";
import Svg from "@/assets/truck-interactive.svg?raw"

const MapInteractive = () => {

    const svgRef = React.useRef<SVGSVGElement|null|undefined>(null)

    React.useEffect(() => {
        const svgMap = svgRef.current;
        svgMap?.classList.add('w-full');
        const nodeNoTags = svgMap?.querySelectorAll('[data-label=Numbers] [data-label]');

        const getLabel = (event: Event) => {
            const target = event.currentTarget as Element;
            console.log(target)
            const currentPreLabel = target.getAttribute('data-label');
            return  svgMap?.querySelector(`[data-label=${currentPreLabel}-Label]`) as HTMLElement;
        }

        const showLabel = (event: Event) => {
            const currentLabel = getLabel(event);
            currentLabel.style.opacity = "1";
        };

        const hiddenLabel = (event: Event) => {
            const currentLabel = getLabel(event);
            currentLabel.style.opacity = "0";
        }

        nodeNoTags?.forEach(node => {
            const circle = node.querySelector('circle') as SVGElement;
            (node as HTMLElement).style.cursor = 'pointer';
            circle.style.fill = "#fff"
        })
        nodeNoTags?.forEach(node => node.addEventListener('mouseover', showLabel));
        nodeNoTags?.forEach(node => node.addEventListener('mouseout', hiddenLabel));
        return () => {
            nodeNoTags?.forEach(node => node.removeEventListener('mouseover', showLabel));
            nodeNoTags?.forEach(node => node.removeEventListener('mouseout', hiddenLabel))
        };
    }, []);

    return (
        <div className="w-full" 
        ref={(div) => {
            svgRef.current = div?.querySelector('svg')
        }}
        dangerouslySetInnerHTML={{ __html: Svg }}></div>
    )
}

export default MapInteractive