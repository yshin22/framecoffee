import { Helmet } from "react-helmet-async"

const Meta = ({title, description, kewords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={kewords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to Frame Coffee Roasters',
    description: 'We sell specialty coffee beans and beverages',
    keywords: 'coffee, roaster, roasting',
}

export default Meta