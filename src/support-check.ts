function testSupportsSmoothScroll() {
  let supports = false
  try {
    const div = window.document.createElement('div')
    // @ts-ignore
    div.scrollTo({
      top: 0,
      get behavior() {
        supports = true
        return 'smooth'
      },
    })
    // eslint-disable-next-line no-empty
  } catch (err) {}
  return supports
}

function testSupportsPassiveOption() {
  let passiveSupported = false

  try {
    const options = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        passiveSupported = true
      },
    })

    // @ts-ignore
    window.addEventListener('test', null, options)
    // eslint-disable-next-line no-empty
  } catch (err) {}

  return passiveSupported
}

export const supportsSmoothScroll = testSupportsSmoothScroll()
export const supportsPassiveOption = testSupportsPassiveOption()
