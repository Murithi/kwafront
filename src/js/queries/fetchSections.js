import gql from 'graphql-tag';

export default gql`
    query SectionFeed{
        sectionFeed{
            id
            sectionName,
                    sectionDescription,                    
                    sectionStartDate,
                    sectionEndDate,
                    sectionLocation,
                    sectionProject {
                        projectName
                    },
        }
    }
`;