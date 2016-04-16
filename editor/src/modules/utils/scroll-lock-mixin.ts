interface ScrollLockMixinInterface {
    scrollLock: (elem: HTMLElement) => void
    scrollRelease: (elem: HTMLElement) => void
    onScrollHandler: (elem: Event) => any
}


export class ScrollLockMixin implements ScrollLockMixinInterface {
    scrollElem: HTMLElement;
    addScrollEventListener(elem: HTMLElement, handler: (e: WheelEvent) => any) {
        elem.addEventListener('wheel', handler, false);
    }
    removeScrollEventListener(elem: HTMLElement, handler: (e: WheelEvent) => any) {
        elem.removeEventListener('wheel', handler, false);
    }
    cancelScrollEvent(e: WheelEvent): boolean {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.returnValue = false;
        return false;
    }
    scrollLock(elem: HTMLElement) {
        if (!this.scrollElem) {
            this.scrollElem = elem;
        }
        this.addScrollEventListener(this.scrollElem, this.onScrollHandler);
    }
    scrollRelease(elem) {
        if (this.scrollElem) {
            this.removeScrollEventListener(this.scrollElem, this.onScrollHandler);
        }
    }
    onScrollHandler(e: WheelEvent): any {
        let elem = this.scrollElem;
        let scrollTop = elem.scrollTop;
        let scrollHeight = elem.scrollHeight;
        let height = elem.clientHeight;
        let wheelDelta = e.deltaY;
        let isDeltaPositive = wheelDelta > 0;

        if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
            elem.scrollTop = scrollHeight;
            return this.cancelScrollEvent(e);
        } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
            elem.scrollTop = 0;
            return this.cancelScrollEvent(e);
        }
    }
};
