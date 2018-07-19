import awsmobile from '../aws-exports';

const region = awsmobile.aws_project_region;
const bucket = awsmobile.aws_user_files_s3_bucket;

export default `https://s3.${region}.amazonaws.com/${bucket}/public/`;
