import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Organization } from './OrganizationForm'

interface OrganizationItemProps {
    organization: Organization;
}

const OrganizationItem: React.FC<OrganizationItemProps> = ({ organization }) => {
    return (
        <ListItem>
            <ListItemText
                primary={organization.name}
                secondary={`Status: ${organization.status}`}
            />
        </ListItem>
    );
};

export default OrganizationItem;
