<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220812161249 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE faculty ADD department_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE faculty ADD CONSTRAINT FK_17966043AE80F5DF FOREIGN KEY (department_id) REFERENCES department (id)');
        $this->addSql('CREATE INDEX IDX_17966043AE80F5DF ON faculty (department_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE faculty DROP FOREIGN KEY FK_17966043AE80F5DF');
        $this->addSql('DROP INDEX IDX_17966043AE80F5DF ON faculty');
        $this->addSql('ALTER TABLE faculty DROP department_id');
    }
}
