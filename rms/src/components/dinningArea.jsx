// ===== ABOUT DINING SECTION =====
<section
  className="py-20 px-4"
  style={{ backgroundColor: COLORS.pureWhite }}
>
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

    {/* ===== LEFT : IMAGE GRID ===== */}
    <div className="grid grid-cols-2 gap-4">
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
        alt="Dining area"
        className="rounded-xl object-cover h-56 w-full"
      />
      <img
        src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
        alt="Interior"
        className="rounded-xl object-cover h-56 w-full"
      />
      <img
        src="https://images.unsplash.com/photo-1544025162-d76694265947"
        alt="Food serving"
        className="rounded-xl object-cover h-56 w-full"
      />
      <img
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
        alt="Luxury dining"
        className="rounded-xl object-cover h-56 w-full"
      />
    </div>

    {/* ===== RIGHT : CONTENT ===== */}
    <div>
      <span
        className="font-semibold tracking-wide"
        style={{ color: COLORS.vibrantOrange }}
      >
        ABOUT US
      </span>

      <h2
        className="text-4xl font-bold mt-2 mb-6"
        style={{ color: COLORS.darkBrown2 }}
      >
        Welcome to <span style={{ color: COLORS.vibrantOrange }}>Restoran</span>
      </h2>

      <p className="text-gray-600 mb-4 leading-relaxed">
        Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
        Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet
        lorem sit.
      </p>

      <p className="text-gray-600 mb-8 leading-relaxed">
        Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
        Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
        sed stet lorem sit clita duo justo magna dolore erat amet.
      </p>

      {/* ===== STATS ===== */}
      <div className="flex items-center gap-10 mb-8">
        <div className="flex items-center gap-4">
          <span
            className="text-5xl font-bold"
            style={{ color: COLORS.vibrantOrange }}
          >
            15
          </span>
          <div className="text-sm uppercase tracking-wide text-gray-600">
            Years of <br />
            <strong className="text-black">Experience</strong>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="text-5xl font-bold"
            style={{ color: COLORS.vibrantOrange }}
          >
            50
          </span>
          <div className="text-sm uppercase tracking-wide text-gray-600">
            Popular <br />
            <strong className="text-black">Master Chefs</strong>
          </div>
        </div>
      </div>

      {/* ===== BUTTON ===== */}
      <button
        className="px-8 py-3 rounded-lg font-semibold transition"
        style={{
          backgroundColor: COLORS.vibrantOrange,
          color: COLORS.pureWhite,
        }}
      >
        READ MORE
      </button>
    </div>

  </div>
</section>
