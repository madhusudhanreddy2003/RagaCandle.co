export default {
  name: 'product',
  title: 'Products & Customizations',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product / Fragrance Name',
      type: 'string',
      description: 'e.g., Rose, Lavender, or "Customized Just For You"',
      validation: Rule => Rule.required()
    },
    {
      name: 'isBespokeStudio',
      title: 'Is this the Custom Candle Card?',
      type: 'boolean',
      description: 'Turn this ON only for the special custom configuration module card.',
      initialValue: false
    },
    {
      name: 'accentColor',
      title: 'Accent Dot Color (Hex)',
      type: 'string',
      description: 'e.g., #E11D48 for regular catalog cards.',
    },
    {
      name: 'image',
      title: 'Studio Showcase Shot',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    
    // --- STANDALONE CATALOG INVENTORY MATRICES ---
    {
      name: 'sizeVariants',
      title: 'Standard Catalog Sizing Tiers',
      type: 'array',
      description: 'Only for standard products. Sizing tiers and their explicit base pricing rules.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'sizeLabel', title: 'Size Label', type: 'string', description: 'e.g., Small (Single Wick)' },
            { name: 'price', title: 'Price (₹)', type: 'number' }
          ]
        }
      ]
    },

    // --- BESPOKE STUDIO GLOBAL CONFIGURATION PRICING MATRIX ---
    {
      name: 'customFragrances',
      title: 'Bespoke Studio: Fragrances & Pricing',
      type: 'array',
      description: 'Provide custom fragrances and their unique modifier costs (Only read if Bespoke Card is toggled True).',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Fragrance Name', type: 'string' },
            { name: 'priceModifier', title: 'Price Modifier (₹)', type: 'number', description: 'Base baseline added value cost rule' }
          ]
        }
      ]
    },
    {
      name: 'customColors',
      title: 'Bespoke Studio: Wax Colors & Pricing',
      type: 'array',
      description: 'Provide custom styling pigment options and their unique costs.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Color Name', type: 'string' },
            { name: 'priceModifier', title: 'Price Modifier (₹)', type: 'number' }
          ]
        }
      ]
    },
    {
      name: 'customJarSizes',
      title: 'Bespoke Studio: Jars & Pricing',
      type: 'array',
      description: 'Provide custom foundational physical container variants and their baseline costs.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'sizeLabel', title: 'Jar Size Name', type: 'string' },
            { name: 'priceModifier', title: 'Price Modifier (₹)', type: 'number' }
          ]
        }
      ]
    },
    {
      name: 'giftPackingPrice',
      title: 'Bespoke Studio: Gift Packing Box Flat Surcharge Cost (₹)',
      type: 'number',
      description: 'Flat markup fee added dynamically if the radio item button is toggled.',
      initialValue: 0
    }
  ]
};