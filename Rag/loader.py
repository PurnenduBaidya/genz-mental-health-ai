from dotenv import load_dotenv
load_dotenv()
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from rich import print

webpages = [
    {
        "url": "https://www.who.int/publications/i/item/9789240003927",
        "topic": "stress",
        "organization": "WHO"
    },

    {
        "url": "https://www.who.int/publications/i/item/9789240100374",
        "topic": "young_people_mental_health",
        "organization": "WHO"
    },

    {
        "url": "https://www.who.int/publications/i/item/9789240120785",
        "topic": "psychological_self_help",
        "organization": "WHO"
    },

    {
        "url": "https://www.who.int/publications/i/item/B09738",
        "topic": "depression",
        "organization": "WHO"
    },

    {
        "url": "https://www.nimh.nih.gov/health/publications/depression",
        "topic": "depression",
        "organization": "NIMH"
    },

    {
        "url": "https://www.nimh.nih.gov/health/publications/generalized-anxiety-disorder-gad",
        "topic": "anxiety",
        "organization": "NIMH"
    }
]

all_docs = []
for webpage in webpages:
    loader =WebBaseLoader(webpage["url"])
    docs = loader.load()
    for doc in docs:
        doc.metadata["topic"] = webpage["topic"]
        doc.metadata["organization"] = webpage["organization"]
        doc.metadata["source_url"] = webpage["url"]
    all_docs.extend(docs)

splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1000,
    chunk_overlap = 200
)
chunks = splitter.split_documents(all_docs)
print("Total chunks:", len(chunks))

embedding_model = HuggingFaceEmbeddings(
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_model,
    persist_directory="./chroma_database",
    collection_name="mental_health"
)

print("\nRAG database created successfully!")
print("Stored chunks:", len(chunks))