function formatDailyRate(dailyRate) {
  const rate = Number(dailyRate)
  if (Number.isNaN(rate)) return dailyRate == null ? '—' : String(dailyRate)
  return `$${rate.toFixed(2)}`
}

export default function CarCard({ car }) {
  const title = [car.make, car.model].filter(Boolean).join(' ') || 'Unnamed vehicle'
  const available = car.isAvailable

  return (
    <article className="car-card">
      <div className="car-card__media">
        <span className={`car-card__badge ${available ? 'car-card__badge--ok' : 'car-card__badge--off'}`}>
          {available ? 'Available' : 'Unavailable'}
        </span>
        <svg className="car-card__art" viewBox="0 0 120 56" role="img" aria-label="Car illustration" focusable="false">
          <path
            d="M10 40l6-15a8 8 0 0 1 7.4-5h41.2a8 8 0 0 1 7.4 5l3 7.5H96a6 6 0 0 1 6 6V44a4 4 0 0 1-4 4h-6a9 9 0 0 0-18 0H46a9 9 0 0 0-18 0h-8a10 10 0 0 1-10-8Z"
            fill="currentColor"
            opacity="0.92"
          />
          <path
            d="M28 22l-4.5 11h26V22Zm28 0v11h17.4L69 25.4A5.4 5.4 0 0 0 64 22Z"
            fill="#fff"
            opacity="0.35"
          />
          <circle cx="37" cy="48" r="7" fill="#101828" />
          <circle cx="37" cy="48" r="3" fill="#e2e8f0" />
          <circle cx="83" cy="48" r="7" fill="#101828" />
          <circle cx="83" cy="48" r="3" fill="#e2e8f0" />
        </svg>
        {car.year != null && car.year !== '' && (
          <span className="car-card__year">{car.year}</span>
        )}
      </div>
      <div className="car-card__body">
        <h3 className="car-card__title">{title}</h3>
        <p className="car-card__meta">
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path
              d="M10 18s6-5.1 6-9.6A6 6 0 0 0 4 8.4C4 12.9 10 18 10 18Zm0-7.4a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {car.location || 'Location not specified'}
        </p>
        <div className="car-card__footer">
          <p className="car-card__rate">
            {formatDailyRate(car.dailyRate)}
            <span>/day</span>
          </p>
          <span className={`pill ${available ? 'pill--ok' : 'pill--muted'}`}>
            <span className="pill__dot" aria-hidden="true" />
            {available ? 'Ready to rent' : 'Not available'}
          </span>
        </div>
      </div>
    </article>
  )
}
