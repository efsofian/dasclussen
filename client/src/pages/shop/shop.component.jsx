import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionPageContainer from '../collection/collection.container';
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const ShopPage = ({ match }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCollectionsStart());
    }, [dispatch]);
    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>
    );
}

export default ShopPage;