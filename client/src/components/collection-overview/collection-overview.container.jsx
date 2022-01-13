import CollectionOverview from "./collection-overview.component";
import WithSpinner from "../with-spinner/with-spinner.component";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";


const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionsOverviewContainer;