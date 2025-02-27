import React from 'react';
import FilterBar from './FilterBar';
import FilterBarBlog from './FilterBarBlog';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import BlogList from './BlogList';
import { BrandItem } from '../../types/BrandItem';
import BrandTable from './BrandTable';

const brands: BrandItem[] = [
  {
    id: "001",
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/logo1.png",
    name: "Starbucks Coffee",
    link: "https://starbucks.com",
    description: "Starbucks Coffee Company - providing high-quality coffee worldwide.",
    status: "Active",
  },
  {
    id: "002",
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/logo2.png",
    name: "Highland Coffee",
    link: "https://highlandcoffee.com",
    description: "A premium coffee brand with rich flavors and traditions.",
    status: "Inactive",
  },
  {
    id: "003",
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/logo3.png",
    name: "The Coffee House",
    link: "https://thecoffeehouse.com",
    description: "Your go-to place for the best coffee experiences.",
    status: "Active",
  },
];

const blogPosts = [
    {
      id: "001",
      title: "Coffee Connoisseur",
      content: "I'm Kev Lewis, a coffee enthusiast based in the North West of England. I'm the founder, author, and chief brewer behind coffeeblog.co.uk, The Coffeeworks.",
      date: "28/12/2024 00:29:10",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6bac088269fb9c7a6c32e676f6c6816b1fa31a35be6ae0f8a57b57e8d29644a7?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      authorImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/2cbda30af462a3673eb282aa69c60528143b48f0a0ed9c3c2504e4b317e98447?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      status: 'active'
    },
    {
      id: "002",
      title: "Coffee Connoisseur",
      content: "I'm Kev Lewis, a coffee enthusiast based in the North West of England. I'm the founder, author, and chief brewer behind coffeeblog.co.uk, The Coffeeworks.",
      date: "28/12/2024 00:29:10",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6bac088269fb9c7a6c32e676f6c6816b1fa31a35be6ae0f8a57b57e8d29644a7?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      authorImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7ffcba4ae83db1f3a0e9573895a05d13fafe6d6cefbebf17610277a5c56a0e9?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      status: 'inactive'
    },
    {
      id: "003",
      title: "Coffee Connoisseur",
      content: "I'm Kev Lewis, a coffee enthusiast based in the North West of England. I'm the founder, author, and chief brewer behind coffeeblog.co.uk, The Coffeeworks.",
      date: "28/12/2024 00:29:10",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6bac088269fb9c7a6c32e676f6c6816b1fa31a35be6ae0f8a57b57e8d29644a7?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      authorImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fe522368a252715acdfb408dfbb9c11df2ec26f7cacb7af3a07fbd5acd6371c?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      status: 'active'
    },
    {
      id: "004",
      title: "Coffee Connoisseur",
      content: "I'm Kev Lewis, a coffee enthusiast based in the North West of England. I'm the founder, author, and chief brewer behind coffeeblog.co.uk, The Coffeeworks.",
      date: "28/12/2024 00:29:10",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6bac088269fb9c7a6c32e676f6c6816b1fa31a35be6ae0f8a57b57e8d29644a7?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      authorImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/2cbda30af462a3673eb282aa69c60528143b48f0a0ed9c3c2504e4b317e98447?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      status: 'active'
    },
    {
      id: "005",
      title: "Coffee Connoisseur",
      content: "I'm Kev Lewis, a coffee enthusiast based in the North West of England. I'm the founder, author, and chief brewer behind coffeeblog.co.uk, The Coffeeworks.",
      date: "28/12/2024 00:29:10",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6bac088269fb9c7a6c32e676f6c6816b1fa31a35be6ae0f8a57b57e8d29644a7?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      authorImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7ffcba4ae83db1f3a0e9573895a05d13fafe6d6cefbebf17610277a5c56a0e9?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      status: 'inactive',
    },
    {
      id: "006",
      title: "Coffee Connoisseur",
      content: "I'm Kev Lewis, a coffee enthusiast based in the North West of England. I'm the founder, author, and chief brewer behind coffeeblog.co.uk, The Coffeeworks.",
      date: "28/12/2024 00:29:10",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6bac088269fb9c7a6c32e676f6c6816b1fa31a35be6ae0f8a57b57e8d29644a7?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      authorImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fe522368a252715acdfb408dfbb9c11df2ec26f7cacb7af3a07fbd5acd6371c?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      status: 'active',
    },
    {
      id: "007",
      title: "Coffee Connoisseur",
      content: "I'm Kev Lewis, a coffee enthusiast based in the North West of England. I'm the founder, author, and chief brewer behind coffeeblog.co.uk, The Coffeeworks.",
      date: "28/12/2024 00:29:10",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6bac088269fb9c7a6c32e676f6c6816b1fa31a35be6ae0f8a57b57e8d29644a7?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      authorImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fe522368a252715acdfb408dfbb9c11df2ec26f7cacb7af3a07fbd5acd6371c?placeholderIfAbsent=true&apiKey=482c75c84bdb4c88a7a67a7f2dd73013",
      status: 'active',
    }
  ];

const BrandList: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="dashboard-body p-6">
            <div className="max-w-[1140px] mx-auto space-y-4">

              {/* Header + Button */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800">Brand Lists</h1>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                  Add New Brand
                </button>
              </div>

              {/* FilterBar để lọc Brand */}
              <FilterBar />

              {/* Brand Table */}
              <BrandTable items={brands as BrandItem[]} />

              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800">Blog Lists</h1>
                <button className="px-4 py-2 border rounded-md bg-red-500 text-white hover:bg-red-600">
                  Delete All
                </button>
              </div>

              {/* FilterBarBlog để lọc Blog */}
              <FilterBarBlog />

              {/* Blog List */}
              <BlogList blogPosts={blogPosts} />

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandList;
