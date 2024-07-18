export const images = [
  "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226062/college-fest/sample-images/zp0ymtpxvxcqho7tzmyg.jpg",
  "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226062/college-fest/sample-images/ddgceodch6xv2exspylu.jpg",
  "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226062/college-fest/sample-images/pfq2n8dmfafbqg7cavtb.jpg",
  "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226062/college-fest/sample-images/egoqzpdahdyfyjjych5e.jpg",
  "https://res.cloudinary.com/dwki4z4cb/image/upload/v1721226061/college-fest/sample-images/lli74qwyvptn3yczhv5r.jpg",
];

export const getDefaultImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};
