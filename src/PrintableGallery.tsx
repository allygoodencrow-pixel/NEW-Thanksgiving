import {printableCollections} from './printableCollections';

export default function PrintableGallery() {
  return <section className="printable-collection" aria-labelledby="printable-collection-heading">
    <div className="printable-collection-intro">
      <span className="eyebrow">THE COLLECTION</span>
      <h2 id="printable-collection-heading">See the finishing touches</h2>
      <p>Explore each set in a real hosting setting. Props, stands and tableware are not included.</p>
      <p className="printable-availability" role="note">Styled previews only. These design downloads are not available yet. Your personalized plan printables are available below.</p>
    </div>
    <div className="printable-collection-grid">
      {printableCollections.map(item=><article className="printable-collection-item" key={item.id} data-collection={item.id}>
        <img src={`/resources/printables/${item.image}`} alt={item.alt} loading="lazy" width="1254" height={item.id==='pumpkin-sketch-studio'?904:1254} />
        <div className="printable-collection-copy">
          <h3>{item.title}</h3>
          <p>{item.contents}</p>
          {item.download
            ? <a href={item.download.href} download={item.download.filename}>DOWNLOAD {item.title}</a>
            : <span className="printable-design-status">PREVIEW ONLY · DOWNLOAD UNAVAILABLE</span>}
        </div>
      </article>)}
    </div>
  </section>;
}
