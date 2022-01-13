import React from 'react';
import { useSelector } from 'react-redux';
import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import './collection-overview.styles.scss';

const CollectionOverview = () => {
    const collections = useSelector(selectCollectionsForPreview);
    return (
        <div className="collections-overview">
            {
                collections.map(({ id, ...otherCollection }) => (
                    <CollectionPreview key={id} {...otherCollection} />
                ))
            }
        </div>
    );
}

export default CollectionOverview;