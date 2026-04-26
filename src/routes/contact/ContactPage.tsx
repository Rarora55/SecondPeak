export function ContactPage() {
  return (
    <section className="contact-page">
      <div className="static-page-inner">
        <h1>Contact Us</h1>
        <form className="contact-form" noValidate>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="you@example.com" />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} placeholder="Write your message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
}
