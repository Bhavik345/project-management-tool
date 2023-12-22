const DashboardPage = () => {
  // Sample array of card data
  const cardDataArray = [
    {
      id: 1,
      imgSrc: 'path/to/image1.jpg',
      heading: 'Card 1 Heading',
      paragraph: 'This is card 1.',
    },
    {
      id: 2,
      imgSrc: 'path/to/image2.jpg',
      heading: 'Card 2 Heading',
      paragraph: 'This is card 2.',
    },
    {
      id: 3,
      imgSrc: 'path/to/image2.jpg',
      heading: 'Card 2 Heading',
      paragraph: 'This is card 2.',
    },
    {
      id: 4,
      imgSrc: 'path/to/image2.jpg',
      heading: 'Card 2 Heading',
      paragraph: 'This is card 2.',
    },
    {
      id: 5,
      imgSrc: 'path/to/image2.jpg',
      heading: 'Card 2 Heading',
      paragraph: 'This is card 2.',
    },
    {
      id: 6,
      imgSrc: 'path/to/image2.jpg',
      heading: 'Card 2 Heading',
      paragraph: 'This is card 2.',
    },
    // Add more card objects as needed
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {cardDataArray.map((card) => (
          <div key={card.id} className="max-w-md rounded overflow-hidden shadow-lg">
            <img className="w-full" src={card.imgSrc} alt={`Card ${card.id} Image`} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{card.heading}</div>
              <p className="text-gray-700 text-base">{card.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
