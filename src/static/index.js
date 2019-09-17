const imagePath = './img/'

export const imageMap = new Map([
  ['icx', require(`${imagePath}icon.png`)],
  ['telegram', require(`${imagePath}telegram.png`)],
  ['contact', require(`${imagePath}contact.png`)]
])

export const getImage = (imageName) => imageMap.get(imageName)
