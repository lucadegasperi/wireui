import { Draggable } from '@/components/TimeSelector/Draggable'

export default class ScrollableOptions {
  protected container: HTMLElement

  protected elements: any[]

  protected pagination: any[] = []

  protected current: any

  protected threshold: number = 0

  protected draggable: Draggable

  protected infinity: boolean = true

  protected customTopGapCallback: CallableFunction = () => 0

  constructor (
    container: HTMLElement,
    elements: any[],
    current: any,
    threshold: number = 37
  ) {
    this.container = container
    this.elements = elements
    this.current = current
    this.threshold = threshold
    this.draggable = new Draggable(this.container)
  }

  start () {
    this.container.classList.add('relative', 'space-y-1.5')

    this.render()

    this.draggable
      .onDragging(({ current }) => {
        const top = this.customTopGapCallback()

        this.container.style.top = `${top + current}px`

        if (Math.abs(current) >= this.threshold) {
          if (top === 0) {
            this.container.style.top = '0px'
          }

          const currentIndex = this.pagination.indexOf(this.current)

          let newIndex = current < 0
            ? currentIndex + 1
            : currentIndex - 1

          if (newIndex < 0) {
            newIndex = this.pagination.length - 1
          }

          if (newIndex >= this.pagination.length) {
            newIndex = 0
          }

          this.current = this.pagination[newIndex] ?? this.current

          this.render()
        }
      })
      .onDragging(({ current, clientY }) => {
        if (Math.abs(current) >= this.threshold) {
          this.draggable.reset({
            initial: clientY,
            current: 0,
            clientY
          })
        }
      })
      .onStop(() => {
        const top = this.customTopGapCallback()

        this.container.style.transition = 'all 0.1s ease-in-out'
        this.container.style.top = `${top}px`

        setTimeout(() => {
          this.container.style.transition = ''
        }, 100)
      })
  }

  render () {
    const SELECTED_CSS = [
      'py-1.5',
      'text-primary-700',
      'font-semibold',
      'text-lg',
      'transition-all',
      'duration-100',
      'ease-in-out'
    ]

    this.infinity
      ? this.pagination = this.padCurrent(this.elements)
      : this.pagination = this.elements

    this.pagination.forEach((value, index) => {
      const li = this.container.children[index] || document.createElement('li')

      li.innerHTML = value?.toString()

      if (value !== this.current && li.classList.length) {
        li.classList.remove(...SELECTED_CSS)
      }

      if (value === this.current) {
        li.classList.add(...SELECTED_CSS)
      }

      if (!this.container.children[index]) {
        this.container.appendChild(li)
      }
    })
  }

  padCurrent (elements: any[]): any[] {
    let currentIndex = elements.indexOf(this.current)

    if (currentIndex === -1) {
      currentIndex = 0
    }

    const length = elements.length
    const result: any[] = []
    const padding = Math.min(Math.floor(length / 2), 5)

    for (let i = -padding; i <= padding; i++) {
      const index = (currentIndex + i + length) % length

      if (index > -1 && index < length) {
        result.push(elements[index])
      }
    }

    return result
  }

  setInfinity (value: boolean): this {
    this.infinity = value

    return this
  }

  useCustomTopGap (callback: CallableFunction): this {
    this.customTopGapCallback = callback

    return this
  }
}
