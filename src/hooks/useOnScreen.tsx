// react
import { useEffect, useState } from 'react'

// useful when you need to determine whether the ref element is visible on screen
const useOnScreen = (ref: React.MutableRefObject<any>, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (ref.current == null) return
    const refCopy = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(ref.current)

    return () => {
      if (refCopy == null) return
      observer.unobserve(refCopy)
    }
  }, [ref, rootMargin])

  return isVisible
}

export default useOnScreen

// example
/*
import { useRef } from 'react' // eslint-disable-line
export const OnScreenComponent = () => {
  const headerTwoRef = useRef<HTMLHeadingElement>(null)
  const visible = useOnScreen(headerTwoRef, '-100px')

  return (
    <div>
      <h1>Header</h1>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum
        nunc sagittis dapibus volutpat. Nunc sed finibus nibh. Suspendisse
        ornare nec felis vel sodales. Suspendisse consequat metus malesuada erat
        scelerisque suscipit. Duis fermentum odio id justo semper elementum. Ut
        eget justo eget elit commodo rutrum quis in nisl. Duis ac porttitor sem.
        Suspendisse bibendum, diam ut vehicula pharetra, justo nisl ultricies
        felis, quis vestibulum metus mi sodales lectus. Aliquam non lacus neque.
        Ut sit amet varius massa. Nullam condimentum nunc nibh, nec dignissim
        tortor rutrum feugiat. Curabitur in enim euismod lectus ullamcorper
        mollis. Nam laoreet enim eget justo blandit convallis. Sed eget tortor
        ante. Nullam porttitor orci at vulputate ornare. Nunc luctus accumsan
        dolor a lacinia. Donec eu commodo risus, id pharetra quam. Cras nisi
        metus, rhoncus non enim eget, rhoncus lobortis ipsum. In sed tortor
        mattis, gravida lacus in, facilisis quam. Nullam sed est sit amet felis
        finibus fermentum. Integer euismod libero vitae nisi consequat
        malesuada. Fusce leo magna, maximus a dignissim eget, gravida eget
        tellus. Cras a facilisis odio, ut volutpat arcu. Etiam felis magna,
        finibus eu orci sit amet, cursus tempor libero. Phasellus porta velit
        mauris, vel laoreet nibh luctus rhoncus. Morbi nunc neque, placerat sit
        amet bibendum nec, ullamcorper sed dolor. Vestibulum ante ipsum primis
        in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam
        vestibulum enim lorem, quis porta enim congue ac. Morbi nec arcu vel
        tellus ultricies posuere at non elit. Fusce turpis nisl, cursus eu
        eleifend sed, pellentesque at nulla. Pellentesque volutpat enim et elit
        rutrum dictum. Nullam consequat facilisis neque, quis feugiat sapien
        vehicula hendrerit. Nulla tortor libero, condimentum eget purus sed,
        iaculis tempor quam. Morbi mattis, nibh quis blandit congue, velit purus
        hendrerit ligula, volutpat feugiat felis augue at lectus. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Nunc egestas leo eu accumsan hendrerit. Proin dapibus lacus non
        mollis vulputate. Aliquam erat mauris, consequat sed tempor tincidunt,
        feugiat at odio. Suspendisse hendrerit aliquet felis, quis aliquam dolor
        congue at. Vivamus at vestibulum mi, sed fermentum augue. In ac auctor
        sapien. In hac habitasse platea dictumst. Vestibulum elementum orci a
        quam sagittis congue. Suspendisse a imperdiet nulla, a facilisis turpis.
        Aliquam erat volutpat. Nam tempor sapien pellentesque, dapibus turpis
        at, porta sem. Aliquam varius quam at nisi scelerisque molestie vitae
        non metus. Duis ornare eu tellus et finibus. Vestibulum feugiat, nibh
        quis euismod maximus, sem arcu auctor sapien, ut accumsan mi eros quis
        orci. Duis eros dui, pretium et nisi a, pellentesque vehicula tortor.
        Suspendisse ac est dolor. Mauris mattis malesuada nulla. Etiam aliquam
        convallis odio, eu efficitur dolor hendrerit non. Mauris fringilla
        sodales nisi nec efficitur. Fusce facilisis eros turpis, at hendrerit
        erat varius ac.
      </div>
      <h1 ref={headerTwoRef}>Header 2 {visible && '(Visible)'}</h1>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum
        nunc sagittis dapibus volutpat. Nunc sed finibus nibh. Suspendisse
        ornare nec felis vel sodales. Suspendisse consequat metus malesuada erat
        scelerisque suscipit. Duis fermentum odio id justo semper elementum. Ut
        eget justo eget elit commodo rutrum quis in nisl. Duis ac porttitor sem.
        Suspendisse bibendum, diam ut vehicula pharetra, justo nisl ultricies
        felis, quis vestibulum metus mi sodales lectus. Aliquam non lacus neque.
        Ut sit amet varius massa. Nullam condimentum nunc nibh, nec dignissim
        tortor rutrum feugiat. Curabitur in enim euismod lectus ullamcorper
        mollis. Nam laoreet enim eget justo blandit convallis. Sed eget tortor
        ante. Nullam porttitor orci at vulputate ornare. Nunc luctus accumsan
        dolor a lacinia. Donec eu commodo risus, id pharetra quam. Cras nisi
        metus, rhoncus non enim eget, rhoncus lobortis ipsum. In sed tortor
        mattis, gravida lacus in, facilisis quam. Nullam sed est sit amet felis
        finibus fermentum. Integer euismod libero vitae nisi consequat
        malesuada. Fusce leo magna, maximus a dignissim eget, gravida eget
        tellus. Cras a facilisis odio, ut volutpat arcu. Etiam felis magna,
        finibus eu orci sit amet, cursus tempor libero. Phasellus porta velit
        mauris, vel laoreet nibh luctus rhoncus. Morbi nunc neque, placerat sit
        amet bibendum nec, ullamcorper sed dolor. Vestibulum ante ipsum primis
        in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam
        vestibulum enim lorem, quis porta enim congue ac. Morbi nec arcu vel
        tellus ultricies posuere at non elit. Fusce turpis nisl, cursus eu
        eleifend sed, pellentesque at nulla. Pellentesque volutpat enim et elit
        rutrum dictum. Nullam consequat facilisis neque, quis feugiat sapien
        vehicula hendrerit. Nulla tortor libero, condimentum eget purus sed,
        iaculis tempor quam. Morbi mattis, nibh quis blandit congue, velit purus
        hendrerit ligula, volutpat feugiat felis augue at lectus. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Nunc egestas leo eu accumsan hendrerit. Proin dapibus lacus non
        mollis vulputate. Aliquam erat mauris, consequat sed tempor tincidunt,
        feugiat at odio. Suspendisse hendrerit aliquet felis, quis aliquam dolor
        congue at. Vivamus at vestibulum mi, sed fermentum augue. In ac auctor
        sapien. In hac habitasse platea dictumst. Vestibulum elementum orci a
        quam sagittis congue. Suspendisse a imperdiet nulla, a facilisis turpis.
        Aliquam erat volutpat. Nam tempor sapien pellentesque, dapibus turpis
        at, porta sem. Aliquam varius quam at nisi scelerisque molestie vitae
        non metus. Duis ornare eu tellus et finibus. Vestibulum feugiat, nibh
        quis euismod maximus, sem arcu auctor sapien, ut accumsan mi eros quis
        orci. Duis eros dui, pretium et nisi a, pellentesque vehicula tortor.
        Suspendisse ac est dolor. Mauris mattis malesuada nulla. Etiam aliquam
        convallis odio, eu efficitur dolor hendrerit non. Mauris fringilla
        sodales nisi nec efficitur. Fusce facilisis eros turpis, at hendrerit
        erat varius ac.
      </div>
    </div>
  )
}
*/
