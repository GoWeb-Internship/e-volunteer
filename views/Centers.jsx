import { Grid } from '@/components';
import Flower from '@/public/img/svg/centers.svg';

const Centers = ({ data }) => {
  return (
    <section className="bg-blue-200 py-[60px] sm:py-[80px] md:py-[100px]">
      <div className="container relative">
        <Flower className="hidden w-[214px] xl:absolute xl:top-0 xl:right-0 xl:block" />
        {data.title && (
          <h2 className="mb-5 text-2xl font-medium leading-tight text-slate-600 sm:mb-12 md:mb-[100px] md:text-[40px]">
            {data.title}
          </h2>
        )}
        <Grid tag="ul" type="contact">
          {data.list &&
            data.list.map(({ name = null, city, address, tel = null }) => {
              const street = address.split(' ');
              return (
                <li
                  key={city}
                  className="border-b border-slate-50 text-slate-600 md:first:row-span-2"
                >
                  {name && (
                    <h3 className="mb-5 text-xl leading-tight text-slate-600 md:mb-[52px] md:text-2xl">
                      {name}
                    </h3>
                  )}
                  <a
                    className="transition-all hover:text-slate-500 focus:text-slate-500"
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    href={`https://www.google.com.ua/maps/place/${street[0]}+${street[1]},${city}`}
                  >
                    {city && (
                      <p className="mb-3 text-lg leading-tight">{city}</p>
                    )}
                    {address && (
                      <address className="mb-3 not-italic">{address}</address>
                    )}
                  </a>

                  {tel && (
                    <a
                      rel="noopener noreferrer nofollow"
                      className=" mb-3 inline-block text-lg leading-tight transition-all hover:text-slate-500 focus:text-slate-500"
                      href={`tel:${tel}`}
                    >
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

export default Centers;
