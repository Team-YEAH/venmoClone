import boto3, botocore
from .config import Config



s3 = boto3.client(
   "s3",
   aws_access_key_id=Config.S3_KEY,
   aws_secret_access_key=Config.S3_SECRET_ACCESS_KEY
)

def upload_file_to_s3(file, bucket_name, user_info, acl="public-read"):

    new_file_name = user_info + '_' + file.filename
    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            new_file_name,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e

    return "{}{}".format(Config.S3_LOCATION, new_file_name)
