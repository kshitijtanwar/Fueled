const AboutUs = () => {
    return (
        <div id="about-us" className="bg-grey-tertiary shadow-lg rounded-lg w-11/2 mx-auto p-6 sm:max-w-2xl sm:p-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-white">About Us</h1>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-start">
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Welcome to Getogether - A Slack for events!
                    </h2>
                    <p className="text-grey-primary mb-4">
                        At Occasion, we revolutionize the way events are managed
                        and experienced. Our platform connects communities,
                        streamlines event planning, and enhances collaboration.
                        Whether you're hosting a virtual conference, a social
                        gathering, or a corporate seminar, Occasion empowers you
                        to create memorable experiences with ease.
                    </p>
                    
                    <p className="text-grey-primary">
                        Join us and transform your events into unforgettable
                        occasions!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
