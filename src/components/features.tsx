export default function Features() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2 mb-4">
              Our sponsors
            </h2>
            <p className="text-xl text-gray-400">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Items */}
          <div
            className="mx-auto grid max-w-sm items-start gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 lg:gap-16"
            data-aos-id-blocks
          >
            {/* 1st item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <img
                className="mb-4 h-16 w-16 "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png"
                alt="Your Image"
              />
            </div>

            {/* 2nd item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <img
                className="mb-4 h-16 w-16 "
                src="https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/36/83/5d/36835dbe-1de1-0833-e92f-cf3de5882ebc/source/512x512bb.jpg"
                alt="Your Image"
              />
            </div>

            {/* 3rd item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <img
                className="mb-4 h-16 w-16 "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png"
                alt="Your Image"
              />
            </div>

            {/* 4th item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <img
                className="mb-4 h-16 w-16 "
                src="https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/36/83/5d/36835dbe-1de1-0833-e92f-cf3de5882ebc/source/512x512bb.jpg"
                alt="Your Image"
              />
            </div>

            {/* 5th item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <img
                className="mb-4 h-16 w-16 "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png"
                alt="Your Image"
              />
            </div>

            {/* 6th item */}
            <div
              className="relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-anchor="[data-aos-id-blocks]"
            >
              <img
                className="mb-4 h-16 w-16 "
                src="https://is4-ssl.mzstatic.com/image/thumb/Purple111/v4/36/83/5d/36835dbe-1de1-0833-e92f-cf3de5882ebc/source/512x512bb.jpg"
                alt="Your Image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
