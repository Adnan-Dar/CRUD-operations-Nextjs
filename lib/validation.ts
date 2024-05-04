import { z } from 'zod';


//define a schema for the edit form
function validateEditProductForm(data: any) {
    const schema = z.object({
        newName: z.string().min(1),
        newImage: z.string().min(1),
        newPrice: z.number().min(1),
        newCategory: z.string().min(1),
    });

    return schema.parse(data);
}

//define a schema for the add form
function validateAddProductForm(data: any) {
    const schema = z.object({
        name: z.string().min(1),
        image: z.string().min(1),
        price: z.number().min(1),
        category: z.string().min(1),
    });

   return  schema.parse(data);
}

export { validateEditProductForm, validateAddProductForm };