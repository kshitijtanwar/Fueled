const AboutUs = () => {
    return (
        <div id="about-us" className="bg-white shadow-lg rounded-lg w-11/2 mx-auto p-6 sm:max-w-2xl sm:p-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Welcome to Ocassion!
                    </h2>
                    <p className="text-grey-secondary mb-4">
                        At Ocassion, we revolutionize the way events are managed
                        and experienced. Our platform connects communities,
                        streamlines event planning, and enhances collaboration.
                        Whether you're hosting a virtual conference, a social
                        gathering, or a corporate seminar, Ocassion empowers you
                        to create memorable experiences with ease.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Founded by industry experts passionate about innovation
                        and excellence, Ocassion leverages cutting-edge
                        technology to deliver seamless event management
                        solutions. Our mission is to build a vibrant community
                        where ideas flourish, and every event is a unique story
                        told brilliantly.
                    </p>
                    <p className="text-gray-600">
                        Join us and transform your events into unforgettable
                        occasions!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
