import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { trips } from "../data/homeData";
import { createPayment } from "../services/paymentService";
import "./Checkout.css";

const SERVICE_FEE = 24;
const money = (n) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const luhn = (digits) => {
  let sum = 0;
  digits
    .split("")
    .reverse()
    .forEach((d, i) => {
      let n = +d;
      if (i % 2) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
    });
  return sum % 10 === 0;
};
const brandOf = (d) =>
  d.startsWith("4") ? "VISA" : /^(5[1-5]|2[2-7])/.test(d) ? "Mastercard" : "";
const fmtCard = (v) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
const fmtExp = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export default function Checkout() {
  const { tripId } = useParams();
  const { isArabic } = useSettings();
  const trip = trips.find((item) => String(item.id) === tripId);

  if (!trip) {
    return (
      <main className="ck-page">
        <div className="ck-done">
          <h1>{isArabic ? "الرحلة غير متاحة للدفع" : "Trip unavailable for checkout"}</h1>
          <p className="ck-muted">{isArabic ? "اختَر رحلة أخرى من قائمة الرحلات." : "Choose another trip from the tour catalog."}</p>
          <Link to="/tours" className="ck-pay ck-linkbtn">{isArabic ? "تصفّح الرحلات" : "Browse tours"}</Link>
        </div>
      </main>
    );
  }

  return <CheckoutForm key={trip.id} trip={trip} />;
}

function CheckoutForm({ trip }) {

  const [method, setMethod] = useState("card");
  const [travelers, setTravelers] = useState(2);
  const [f, setF] = useState({
    name: "",
    number: "",
    exp: "",
    cvv: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const subtotal = trip.price * travelers;
  const total = subtotal + SERVICE_FEE;
  const digits = f.number.replace(/\s/g, "");
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  function validate() {
    const e = {};
    if (!f.name.trim()) e.name = "Enter the name on your card";
    if (digits.length < 13 || !luhn(digits))
      e.number = "Please check your card number";
    const m = f.exp.match(/^(\d{2})\/(\d{2})$/);
    if (!m || +m[1] < 1 || +m[1] > 12) e.exp = "Use MM/YY";
    else {
      const now = new Date();
      const year = 2000 + +m[2];
      if (
        year < now.getFullYear() ||
        (year === now.getFullYear() && +m[1] < now.getMonth() + 1)
      )
        e.exp = "This card has expired";
    }
    if (!/^\d{3,4}$/.test(f.cvv)) e.cvv = "3 or 4 digits";
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Enter a valid email";
    return e;
  }

  async function pay(ev) {
    ev.preventDefault();
    if (method === "card") {
      const errs = validate();
      setErrors(errs);
      if (Object.keys(errs).length) return;
    }
    setLoading(true);
    const res = await createPayment({
      tripId: trip.id,
      travelers,
      method,
      amount: total,
      last4: digits.slice(-4),
    });
    setLoading(false);
    setResult(res);
  }

  if (result) {
    const ok = result.status === "success";
    return (
      <main className="ck-page">
        <div className="ck-done">
          <div className={`ck-badge ${ok ? "ok" : "bad"}`}>
            {ok ? "✓" : "✕"}
          </div>
          <h1>
            {ok ? "Demo booking completed" : "Payment didn’t go through"}
          </h1>
          {ok ? (
            <>
              <p className="ck-muted">
                Demo booking reference <strong>{result.bookingId}</strong>. No payment was collected or email sent.
              </p>
              <ul className="ck-lines">
                <li>
                  <span>Trip</span>
                  <span>{trip.title}</span>
                </li>
                <li>
                  <span>Travelers</span>
                  <span>{travelers}</span>
                </li>
                <li>
                  <span>Paid with</span>
                  <span>
                    {method === "card"
                      ? `Card ending ${digits.slice(-4)}`
                      : "PayPal"}
                  </span>
                </li>
                <li className="total">
                  <span>Simulated total</span>
                  <span>${money(total)} USD</span>
                </li>
              </ul>
              <Link to="/" className="ck-pay ck-linkbtn">
                Back to Home
              </Link>
            </>
          ) : (
            <>
              <p className="ck-muted">
                {result.message} You were not charged. Please try again or use
                another method.
              </p>
              <button className="ck-pay" onClick={() => setResult(null)}>
                Try again
              </button>
            </>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="ck-page">
      <div className="ck-card">
        <section className="ck-left">
          <h1>Checkout</h1>
          <p className="ck-sub">
            Demo checkout. Use test details only. Prices are provisional and no payment is collected.
          </p>

          <div className="ck-summary">
            <div
              className="ck-thumb"
              style={{ backgroundImage: `url(${trip.img})` }}
            />
            <div>
              <strong>{trip.title}</strong>
              <div className="ck-muted">
                {trip.date} • {trip.days}
              </div>
              <div className="ck-muted">Guide: {trip.guide}</div>
            </div>
          </div>

          <div className="ck-travelers">
            <span>Travelers</span>
            <div className="ck-stepper">
              <button
                type="button"
                aria-label="Fewer travelers"
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
              >
                −
              </button>
              <b>{travelers}</b>
              <button
                type="button"
                aria-label="More travelers"
                onClick={() => setTravelers(Math.min(10, travelers + 1))}
              >
                +
              </button>
            </div>
          </div>

          <ul className="ck-lines">
            <li>
              <span>
                ${money(trip.price)} × {travelers}
              </span>
              <span>${money(subtotal)}</span>
            </li>
            <li>
              <span>Service fee</span>
              <span>${money(SERVICE_FEE)}</span>
            </li>
            <li className="total">
              <span>Total</span>
              <span>${money(total)} USD</span>
            </li>
          </ul>

          <p className="ck-note">
            🔒 Payments are encrypted. Your guide is paid only after the trip
            starts. Free cancellation up to 48 hours before.
          </p>
        </section>

        <form className="ck-right" onSubmit={pay} noValidate>
          <div
            className="ck-methods"
            role="radiogroup"
            aria-label="Payment method"
          >
            <button
              type="button"
              role="radio"
              aria-checked={method === "card"}
              className={method === "card" ? "on" : ""}
              onClick={() => setMethod("card")}
            >
              💳 Card <small>Visa / Mastercard</small>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={method === "paypal"}
              className={method === "paypal" ? "on" : ""}
              onClick={() => setMethod("paypal")}
            >
              <b className="ck-pp">PayPal</b>
            </button>
          </div>

          {method === "card" ? (
            <>
              <div className="ck-field">
                <label htmlFor="ck-name">Name on card</label>
                <input
                  id="ck-name"
                  autoComplete="cc-name"
                  placeholder="Name as shown on the card"
                  value={f.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="ck-err" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="ck-field">
                <label htmlFor="ck-number">Card number</label>
                <div className="ck-wrap">
                  <input
                    id="ck-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    value={f.number}
                    onChange={(e) => set("number", fmtCard(e.target.value))}
                    aria-invalid={!!errors.number}
                  />
                  {brandOf(digits) && (
                    <span className="ck-brand">{brandOf(digits)}</span>
                  )}
                </div>
                {errors.number && (
                  <p className="ck-err" role="alert">
                    {errors.number}
                  </p>
                )}
              </div>

              <div className="ck-two">
                <div className="ck-field">
                  <label htmlFor="ck-exp">Expiry date</label>
                  <input
                    id="ck-exp"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={f.exp}
                    onChange={(e) => set("exp", fmtExp(e.target.value))}
                    aria-invalid={!!errors.exp}
                  />
                  {errors.exp && (
                    <p className="ck-err" role="alert">
                      {errors.exp}
                    </p>
                  )}
                </div>
                <div className="ck-field">
                  <label htmlFor="ck-cvv">CVV</label>
                  <input
                    id="ck-cvv"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    maxLength={4}
                    value={f.cvv}
                    onChange={(e) =>
                      set("cvv", e.target.value.replace(/\D/g, ""))
                    }
                    aria-invalid={!!errors.cvv}
                  />
                  {errors.cvv && (
                    <p className="ck-err" role="alert">
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              <div className="ck-field">
                <label htmlFor="ck-email">Send receipt to</label>
                <input
                  id="ck-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={f.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="ck-err" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <button className="ck-pay" disabled={loading}>
                {loading ? "Processing..." : `Pay $${money(total)}`}
              </button>
            </>
          ) : (
            <div className="ck-paypal">
              <p className="ck-muted">
                You’ll be taken to PayPal to finish your payment securely, then
                brought back here.
              </p>
              <button className="ck-pay ck-ppbtn" disabled={loading}>
                {loading ? "Processing..." : "Continue with PayPal"}
              </button>
            </div>
          )}

          <Link to="/" className="ck-back">
            ← Go back
          </Link>
        </form>
      </div>
    </main>
  );
}
