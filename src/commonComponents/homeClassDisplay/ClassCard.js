import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ClassCard({ image, classname, createdby }) {
    return (
        <Card sx={{ maxWidth: 800,margin:'0px 10px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {classname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Created By <b>{createdby}</b>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}