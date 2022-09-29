import { Grid } from '@/components';

export const Centers = ({ data }) => {
  return (
    <section className="bg-blue-200">
      <div className="container">
        {data.title && <h2>{data.title}</h2>}
        <Grid tag="ul" type="contact">
          {data.list &&
            data.list.map(({ name = null, city, address, tel = null }) => {
              const street = address.split(' ');
              return (
                <li key={city} className="md:first:row-span-2">
                  {name && <h3>{name}</h3>}
                  <a
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    href={`https://www.google.com.ua/maps/place/${street[0]}+${street[1]},${city}`}
                  >
                    {city && <h3>{city}</h3>}
                    {address && <address>{address}</address>}
                  </a>
                  {tel && (
                    <a rel="noopener noreferrer nofollow" href={`tel:${tel}`}>
                      {tel}
                    </a>
                  )}
                </li>
              );
            })}
        </Grid>
      </div>
    </section>
  );
};
