import { computed, type Ref } from "vue";

/**
 * The page section the visitor is currently looking at.
 *
 * This logic used to live inside CanvasComponent's render loop, behind a guard
 * that required every 3D ref to be ready. That made the nav's active-section
 * highlight a side effect of rendering the scene: with no canvas mounted, the
 * highlight only ever moved when a nav link was clicked and otherwise sat on
 * "top" for the whole page.
 *
 * It reads nothing but scroll geometry, so both the WebGL and fallback paths can
 * share it.
 *
 * Returns undefined while the header height is unknown, and between sections.
 */
export function useCurrentSegment(
    scrollY: Ref<number>,
    sectionRefs: Array<Ref<HTMLElement | undefined>>,
    headerHeight: Ref<number>,
) {
    return computed(() => {
        if (!headerHeight.value) return undefined;

        // Matches the original render-loop behaviour: a section is current once
        // its top passes the middle of the header.
        const threshold = headerHeight.value / 2;

        return sectionRefs.find((sectionRef) => {
            const element = sectionRef.value;
            if (!element) return false;

            return (
                scrollY.value > element.offsetTop - threshold &&
                scrollY.value < element.offsetTop + element.offsetHeight - threshold
            );
        })?.value?.id;
    });
}
